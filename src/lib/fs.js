const readJSON = async (file) =>
  new Promise((res, rej) => {
    if (!file || !file.type === "application/json") {
      rej("Invalid file type");
      return;
    }

    const reader = new FileReader();

    reader.onload = ({ target: { result } }) => {
      const data = JSON.parse(result);
      res(data);
    };

    reader.readAsText(file);
  });

const writeJSON = async (filename, data) =>
  new Promise((res) => {
    const el = document.createElement("a");

    el.onclick = () => res(filename);

    el.href = URL.createObjectURL(
      new Blob([JSON.stringify(data)], {
        type: "text/plain"
      })
    );
    el.download = filename;
    el.click();
  });

export { readJSON, writeJSON };
