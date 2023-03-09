(function () {
  'use strict';

  figma.showUI(
    __html__,
    { width: 350, height: 400, title: "DevBud", position: { x: 650, y: -300 }, }
  );

  figma.ui.onmessage = (msg) => {
    if (msg.type === 'clone') {

      const imagePlugin = async () => {
        const node = figma.currentPage.selection[0];
        const w =  node.width;
        const h =  node.height;
      
        // Export a 2x resolution PNG of the node
        const bytes = await node.exportAsync({
          format: 'PNG',
          constraint: { type: 'SCALE', value: 2 },
        });

        if(node) {
          sendDatatoUI(bytes);
        }

        // Add the image onto the canvas as an image fill in a frame
        const image = figma.createImage(bytes);
        const frame = figma.createFrame();
        frame.x = 700;
        frame.resize(w, h);
        frame.fills = [{
          imageHash: image.hash,
          scaleMode: "FILL",
          scalingFactor: 1,
          type: "IMAGE",
        }];
      };

      imagePlugin();

        async function sendDatatoUI(bytes) {
         figma.postMessage({ bytesData : bytes }); }

    
    

      // This is how figma responds back to the ui
      // figma.ui.postMessage({
      //   type: 'create-rectangles',
      //   message: `Created ${msg.count} Rectangles`,
      // });
    }

    if(msg.type === 'login') {

        async function fetchCode (url) {
        const response = await fetch(url);
        const data = await response.json();
        const code = data.data.code;
        const WINDOW_BASE_URL = "https://api.bud.dev2staging.com/v1/oauth/google?code=";
        const POLL_URL_BASE = "https://api.bud.dev2staging.com/v1/plugin-auth/code?code=";

        const WINDOW_URL = WINDOW_BASE_URL.concat(code);
        const POLL_URL = POLL_URL_BASE.concat(code);
          figma.ui.postMessage({  windowURL : WINDOW_URL, pollURL : POLL_URL }); 
        }

      fetchCode('https://api.bud.dev2staging.com/v1/plugin-auth/code');

    }   

    figma.on('close', () => {
      });


   };

})();
