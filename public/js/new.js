// file 버튼 클릭 시 이름 보이기

const fileValue = document.querySelector('.form__file');
const fileName = document.querySelector('.upload-name');

fileValue.addEventListener('change', () => {
  console.dir(fileValue.files.length)

  let selectedFile = []
  for(let i = 0; i < fileValue.files.length; i++) {
    selectedFile.push(fileValue.files[i].name)
  }
  fileName.value = `${selectedFile.join(', ')}`
})