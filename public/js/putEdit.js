const putEdit = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector('#edit-title').value.trim();
  const text = document.querySelector('#edit-text').value.trim();
  const blog_id = document.querySelector('.edit-form').getAttribute('data-id');

  if ( title && text) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/blogs/${blog_id}`, {
      method: 'PUT',
      body: JSON.stringify({ title,  text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace(`/blogs/${blog_id}`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.edit-form')
  .addEventListener('submit', putEdit);
