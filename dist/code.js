(function () {
  'use strict';

  figma.showUI(
    __html__,
    { width: 750, height: 500}
  );


  const imagePlugin = async () => {
    const node = figma.currentPage.selection[0];

    // Export a 2x resolution PNG of the node
    const bytes = await node.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 3 },
    });

    // Add the image onto the canvas as an image fill in a frame
    const image = figma.createImage(bytes);
    const frame = figma.createFrame();
    frame.x = 700;
    frame.resize(700, 700);
    frame.fills = [{
      imageHash: image.hash,
      scaleMode: "FILL",
      scalingFactor: 1,
      type: "IMAGE",
    }];
  };

  imagePlugin();




  figma.ui.onmessage = (msg) => {
    if (msg.type === 'Frame') ;

    figma.on('close', () => {
      // code to delete any objects or variables that were created to prevent memory leaks
      bytesData = null;
      });


   };

})();
