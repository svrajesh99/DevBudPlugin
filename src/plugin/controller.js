figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-rectangles') {
    const nodes = [];

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'create-rectangles',
      message: `Created ${msg.count} Rectangles`,
    });
  }

  if (msg.type === 'websocket') {

  const socket = new WebSocket('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self');

// Add event listeners for the WebSocket connection
socket.addEventListener('open', event => {
  console.log('WebSocket connection established.');
  
  // Send a message to the WebSocket server
  const message = 'Hello, WebSocket server!';
  socket.send(message);
});

socket.addEventListener('message', event => {
  console.log('Received message:', event.data);
});

socket.addEventListener('close', event => {
  console.log('WebSocket connection closed.');
});

socket.addEventListener('error', event => {
  console.error('WebSocket error:', event.error);
});

      
  }

  figma.closePlugin();
};
