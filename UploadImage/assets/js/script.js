const uploadImg = document.querySelector("#upload-img");
const imgInput = document.querySelector("#img-input");
const uploadArea = document.querySelector(".upload-area");
const posts = document.querySelector(".posts");

uploadImg.addEventListener("click", () => {
    uploadImg.nextElementSibling.click();
})

imgInput.addEventListener("change", () => {
    if (imgInput.files && imgInput.files[0]) {

        const reader = new FileReader();

        let imgName = imgInput.files[0].name;

        reader.readAsDataURL(imgInput.files[0]);

        reader.onload = (e) => {
            // Img Name undefined
            // console.log(e.target.name);
            // e.target.name = "img"

            if (!checkImg(e.target.result)) {
                posts.innerHTML += `
                <div class="post col-3">
                    <div class="post-img">
                        <img src="${e.target.result}" alt="">
                    </div>
                    <div class="img-download">
                        <a href="${e.target.result}" id="downloadImg" download="${imgName}">
                            <span>Download</span>
                            <i class="fa-solid fa-file-arrow-down"></i>
                        </a>
                    </div>
                </div>`;
            } else {
                alert("The photo has been added!!")
            }
        }
    };
})


uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();

})

uploadArea.addEventListener("drop", (e) => {
    //Browser open the image in  curent tap
    e.preventDefault();

    const { dataTransfer } = e;

    let fileReader = new FileReader();

    fileReader.readAsDataURL(dataTransfer.files[0]);

    let imgName = dataTransfer.files[0].name;

    fileReader.onload = function () {
        // Img base 64 format
        // console.log(fileReader.result);

        // Img Name undefined
        // console.log(fileReader.name);

        if (!checkImg(fileReader.result)) {
            posts.innerHTML += `
            <div class="post col-3">
                <div class="post-img">
                    <img src="${fileReader.result}" alt="">
                </div>
                <div class="img-download">
                    <a href="${fileReader.result}" id="downloadImg" download="${imgName}">
                        <span>Download</span>
                        <i class="fa-solid fa-file-arrow-down"></i>
                    </a>
                </div>
            </div>`;
        } else {
            alert("The photo has been added!!")
        }
    }
});

let btnDownload = document.querySelector("#downloadImg");


function checkImg(imgSrc) {
    let postsImg = document.querySelectorAll(".post-img img");
    let isSmae = false;

    postsImg.forEach((postImg) => {
        if (postImg.getAttribute("src") === imgSrc) {
            isSmae = true;
            return isSmae;
        }
    })
    return isSmae;
}