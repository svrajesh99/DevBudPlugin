

figma.showUI(
  __html__,
  { width: 750, height: 500}
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

      // var blob = new Blob([bytes], {'type': 'image/png'});
      // var url = URL.createObjectURL(blob);
      // console.log(url);

      // document.getElementById("myimg").src = url;


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




  figma.on('close', () => {
    bytesData = null;
    });


 };
