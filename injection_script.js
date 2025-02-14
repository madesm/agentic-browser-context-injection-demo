// Example: Inject a global context and a button into the DOM
(function() {
  // Define a global context (this can be any data you need)
  window.myAppContext = {
    userId: 'user-123',
    sessionToken: 'abc123',
    requestedScope: 'read:importantData'
  };

  // Create and style the button
  const button = document.createElement('button');
  button.innerText = 'Perform Secure Action';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.padding = '10px 20px';
  document.body.appendChild(button);

  // Attach a click listener
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    
    // Check if context is available
    if (!window.myAppContext) {
      console.error('Context is missing.');
      return;
    }
    
    // Begin authorization process
    try {
      const authorized = await requestAuthorization(window.myAppContext);
      if (authorized) {
        // Proceed with the intended action
        console.log('Authorization approved. Continuing with action...');
        // ... Place further action logic here ...
      } else {
        console.warn('Authorization denied.');
      }
    } catch (error) {
      console.error('Error during authorization:', error);
    }
  });
})();
