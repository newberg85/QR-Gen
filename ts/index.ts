const form = document.querySelector("#form");
const qrUrl: HTMLInputElement | null = document.querySelector("#qr-url");

const qrImage = document.querySelector("#qr-image");

const downloadBtn = document.querySelector("#download-btn");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!qrUrl || !qrImage || !downloadBtn) return;

  const Url = qrUrl.value;

  if (Url.length < 3) {
    alert("A Url precisa ter mais de 1 caractere");
    return;
  }

  try {
    const response = await fetch(
      `https://api.qrserver.com/v1/create-qr-code/?data=${Url}&size=300x300`
    );

    const data = response.url;

    qrImage.innerHTML = `
      <img src="${data}">
    `;

    downloadBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const response = await fetch(data);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  } catch (error) {
    console.log(error);
  }
});
