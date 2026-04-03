let currentFile = '';
let currentContent = '';

async function fetchLists() {
  const res = await fetch('lists.json');
  const names = await res.json();
  const container = document.getElementById('lists');
  
  for (const name of names) {
    const btn = document.createElement('button');
    btn.className = 'block w-full text-left px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded transition';
    btn.textContent = name;
    btn.onclick = () => openModal(`lists/${name}.md`);
    container.appendChild(btn);
  }
}

async function openModal(path) {
  const res = await fetch(path);
  currentContent = await res.text();
  currentFile = path.split('/').pop().replace('.md', '');
  
  document.getElementById('modal-title').textContent = currentFile;
  document.getElementById('modal-content').innerHTML = marked.parse(currentContent);
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal').classList.add('flex');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('modal').classList.remove('flex');
}

function download(filename, content) {
  const blob = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

document.getElementById('download-md').onclick = () => {
  download(`${currentFile}.md`, currentContent);
};

document.getElementById('download-txt').onclick = () => {
  download(`${currentFile}.txt`, currentContent);
};

document.getElementById('modal').onclick = (e) => {
  if (e.target.id === 'modal') closeModal();
};

fetchLists();
