import './styles.scss';

const imageForm = document.getElementById('imageForm');
// @ts-ignore
const imageInput: HTMLInputElement = document.getElementById('imageInput');
imageInput.addEventListener('change', (event) => {
  const file = imageInput.files[0];
  const span = document.getElementById('span');
  span.innerHTML = file.name;
});

imageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const file = imageInput.files[0];
  const { url } = await fetch('/s3Url').then((res) => res.json());
  console.log(url);

  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: file,
  });
  const content = document.getElementById('content');
  const imageUrl = url.split('?')[0];
  console.log(imageUrl);
  const img = document.createElement('img');
  img.setAttribute('class', 'content--img');
  img.src = imageUrl;
  content.append(img);
  const span = document.getElementById('span');
  span.innerHTML = 'Choose a image';
});
