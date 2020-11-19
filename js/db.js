var dbPromised = idb.open("premier-league", 1, upgradeDb => {
	if (!upgradeDb.objectStoreNames.contains("favoteams")) {
		upgradeDb.createObjectStore("favoteams", {
			keyPath: "id"
		});
	}
});

function saveFavorite(team) {
	dbPromised.then(db => {
		var tx = db.transaction("favoteams", "readwrite");
		var store = tx.objectStore("favoteams");
		store.put(team);
		return tx.complete;
	})
		.then(() => {
			M.toast({
				html: 'Berhasil menambahkan team ke My favorite'
			})
		})
}

function getAllFavorite() {
	return new Promise(function (resolve, reject) {
		dbPromised
			.then(function (db) {
				var tx = db.transaction("favoteams", "readonly");
				var store = tx.objectStore("favoteams");
				return store.getAll();
			})
			.then(function (teams) {
				resolve(teams);
			});
	})
}

function deleteFavorite(idteam) {
	dbPromised.then(function (db) {
		var tx = db.transaction('favoteams', 'readwrite');
		var store = tx.objectStore('favoteams');
		store.delete(idteam);
		return tx.complete;
	}).then(function () {
		M.toast({
			html: 'Berhasil menghapus team dari My favorite'
		})
		// location.reload();
	});
}

// Tambahan
// buat Fungsi untuk dapetin data dari db by id return promise.

function getDataDbById(id) {
	return new Promise(function (resolve, reject) {
		dbPromised
			.then(function (db) {
				var tx = db.transaction("favoteams", "readonly");
				var store = tx.objectStore("favoteams");
				return store.get(id);
			})
			.then(function (teams) {
				resolve(teams);
			});
	})
}