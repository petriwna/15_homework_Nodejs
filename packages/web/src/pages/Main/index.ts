import './styles.scss';

const imageForm = document.getElementById('imageForm');
// @ts-ignore
const imageInput: HTMLInputElement = document.getElementById('imageInput');

imageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const file = imageInput.files[0];

  const { url } = await fetch('/s3Url').then((res) => res.json());

  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: file,
  });
  const container = document.getElementById('container');
  const imageUrl = url.split('?')[0];
  const img = document.createElement('img');
  img.setAttribute('class', 'container--img');
  img.src = imageUrl;
  container.append(img);
});
