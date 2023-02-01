const postComment = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const text = document.querySelector('#new-comment-text').value.trim();
  const blog_id = document.querySelector('.new-comment-form').getAttribute('data-id');

  if ( text && blog_id) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ text,  blog_id }),
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

const showBox = (event) => {
  event.preventDefault();
  document.querySelector('.new-comment-box').setAttribute('style','display: block;');
  document.querySelector('.add-new-comment').setAttribute('style','display: none;');
};

document
  .querySelector('.add-new-comment')
  .addEventListener('submit', showBox);

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', postComment);
