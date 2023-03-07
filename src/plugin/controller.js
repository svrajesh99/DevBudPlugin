

figma.showUI(
  __html__,
  { width: 350, height: 400, title: "DevBud", position: { x: 650, y: -300 }, }
)


let bytesData;

figma.ui.onmessage = (msg) => {
  if (msg.type === 'clone') {

    const imagePlugin = async () => {
      const node = figma.currentPage.selection[0]
      const w =  node.width;
      const h =  node.height;
    
      // Export a 2x resolution PNG of the node
      const bytes = await node.exportAsync({
        format: 'PNG',
        constraint: { type: 'SCALE', value: 2 },
      })

      if(node) {
        sendDatatoUI(bytes)
      }

      // Add the image onto the canvas as an image fill in a frame
      const image = figma.createImage(bytes)
      const frame = figma.createFrame()
      frame.x = 700
      frame.resize(w, h)
      frame.fills = [{
        imageHash: image.hash,
        scaleMode: "FILL",
        scalingFactor: 1,
        type: "IMAGE",
      }]
    }

    imagePlugin()

    async function sendDatatoUI(bytes) {
       figma.ui.postMessage({ bytesData : bytes }) }

  
  

    // This is how figma responds back to the ui
    // figma.ui.postMessage({
    //   type: 'create-rectangles',
    //   message: `Created ${msg.count} Rectangles`,
    // });
  }

  if(msg.type === 'login') {

    figma.showUI(`

    <script>   
      async function fetchCode (url) {
      const response = await fetch(url);
      const data = await response.json();
      const code = data.data.code;
      const BASE_URL = "https://api.bud.dev2staging.com/v1/oauth/google?code="

      const accessTokenURL = BASE_URL.concat(code);
      window.open(accessTokenURL)
      var responseAT = null;

      function myFunction() {
        if (responseAT == null) {
           responseAT = fetch(window.open(accessTokenURL));
        } else {
          clearInterval(intervalID);
          console.log(responseAT);
        }
      }
      
      var intervalID = setInterval(myFunction, 10);
      
    }

    fetchCode('https://api.bud.dev2staging.com/v1/plugin-auth/code');

    </script>`,
    { width: 750, height: 500, title:"Login to DevBud"}
    );
}

  figma.on('close', () => {
    bytesData = null;
    });


 };
