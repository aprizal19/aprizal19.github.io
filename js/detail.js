document.addEventListener("DOMContentLoaded", () => {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);

    // var item = detailTeam();


    // var addToFavorite = document.getElementById("addToFavorite");
    // addToFavorite.onclick = () => {
    //     console.log("Tombol Fab di klik");
    //     item.then(team => {
    //         saveFavorite(team);
    //     })
    // }

    const addToFavorite = document.getElementById("addToFavorite");
    const urlParams = new URLSearchParams(window.location.search);
    // ini pake let karena nilainya akan diubah/ diset
    let idParam = urlParams.get("id");
    idParam = parseInt(idParam);
    let isFromdb;

    const item = detailTeam();

    function loadButton() {

        getDataDbById(idParam).then(function (data) {
            // kondisi jiak ada data
            if (data) {
                // pakai fungsi yang ada di api.js tinggal kirim data hasil dari db, biar simple :-)
                detailTeamHTML(data)
                // jika ada data maka statusnya true
                isFromdb = true;
                // ganti isi button, setting class biar ubah warna
                addToFavorite.innerHTML = `<i class="large material-icons">delete</i>`;
                addToFavorite.classList.remove('purple');
                addToFavorite.classList.add('red');
            } else {
                detailTeam();
                isFromdb = false;
                addToFavorite.innerHTML = `<i class="large material-icons">bookmark_border</i>`;
                addToFavorite.classList.remove('red');
                addToFavorite.classList.add('purple');
            }
        })
    }

    addToFavorite.onclick = function () {
        if (isFromdb === true) {
            // pakai fungsi deletteFavorite yang ada di db.js tinggal kiri id , tidak pakai yang deleteOnClick di api.js karena kalau pake deleteOnClick akan ikut jalani fungsi dibawahnya yang bikin error
            deleteFavorite(idParam)

            // refresh button
            loadButton();
        } else {
            item.then(team => {
                saveFavorite(team);
                loadButton();
            })

        }
    }
    // jalankan untuk pertama di load
    loadButton();
});