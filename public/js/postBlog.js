const postBlog = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector('#new-post-title').value.trim();
  const text = document.querySelector('#new-post-text').value.trim();

  if (title && text) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({ text, title }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', postBlog);
