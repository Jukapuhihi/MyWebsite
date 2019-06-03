const q = require("q");
const db = require("../common/database");

const conn = db.getConnection();

function getAllNews(keyword) {
    const defer = q.defer();
    const query = conn.query('SELECT * FROM news WHERE newsTitle LIKE ?', ['%' + keyword + '%'], function (err, news) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(news);
        }
    });
    return defer.promise;
}

function addNews(params) {
    if (params) {
        const defer = q.defer();
        const query = conn.query('INSERT INTO news SET ?', params, function (err, result) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

function getNewsByNewsID(newsID) {
    if (newsID) {
        const defer = q.defer();
        const query = conn.query('SELECT * FROM news WHERE ?', { newsID: newsID }, function (err, result) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

function updateNews(params) {
    if (params) {
        const defer = q.defer();
        const query = conn.query('UPDATE news SET newsTitle=?, newsContent=?  WHERE newsID=?', [params.newsTitle, params.newsContent, params.newsID], function (err, result) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

function deleteNews(newsID) {
    if (newsID) {
        const defer = q.defer();
        const query = conn.query('DELETE FROM news WHERE ?', { newsID: newsID }, function (err, result) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

module.exports = {
    getAllNews: getAllNews,
    addNews: addNews,
    getNewsByNewsID: getNewsByNewsID,
    updateNews: updateNews,
    deleteNews: deleteNews
}