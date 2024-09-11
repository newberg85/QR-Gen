"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#form");
const qrUrl = document.querySelector("#qr-url");
const qrImage = document.querySelector("#qr-image");
const downloadBtn = document.querySelector("#download-btn");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!qrUrl || !qrImage || !downloadBtn)
        return;
    const Url = qrUrl.value;
    if (Url.length < 3) {
        alert("A Url precisa ter mais de 1 caractere");
        return;
    }
    try {
        const response = yield fetch(`http://api.qrserver.com/v1/create-qr-code/?data=${Url}&size=300x300`);
        const data = response.url;
        qrImage.innerHTML = `
      <img src="${data}">
    `;
        downloadBtn.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const response = yield fetch(data);
            const blob = yield response.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }));
    }
    catch (error) {
        console.log(error);
    }
}));
