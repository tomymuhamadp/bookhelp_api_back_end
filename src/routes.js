const {getAllBooksHandler,addBooksHandler,deleteBooksHandler, getBooksById,editBooksHandler} =require('./handler');
const routes=[

    //route ambil semua data
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
        options: {
            cors:{
                origin:['*'],
            },
        },
    },

    //route nambah data
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler,
        options: {
            cors:{
                origin:['*'],
            },
        },

    },
    //route hapus
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBooksHandler,
        options: {
            cors:{
                origin:['*'],
            },
        },

    },
    //temukan buku dengan id
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBooksById,
        options: {
            cors:{
                origin:['*'],
            },
        },

    },

    //update data

    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBooksHandler,
        options: {
            cors:{
                origin:['*'],
            },
        },
    },
    

];

module.exports=routes;