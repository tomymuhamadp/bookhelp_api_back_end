const { request } = require('http');
const {nanoid}=require('nanoid');
const books =require('./books');


//list all data

const getAllBooksHandler = () => ({
    
        status: 'success',
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            }),
            ),
        },
    
           
      });

//nambah data buku
const addBooksHandler = (request, h)=> {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook= {
       id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
    };

if(newBook.name === undefined){
    const response = h.response({
        status:'fail',
        message:'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
} else if((newBook.name == "") || (newBook.name == null)){
const response=h.response({
status:'fail',
message:'Gagal menambahkan buku. Mohon isi nama buku/tidak boleh null',
});
response.code(400);
return response;
}else if(newBook.pageCount < newBook.readPage){
    const response =h.response({
        status:'fail',
        message:'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
}

   books.push(newBook);
   const isSuccess=books.filter((book) => book.id === id).length > 0;
   if(isSuccess){
    const response =h.response({
        status:'success',
        message:'Buku berhasil ditambahkan',
        data:{ bookId : id, },
    });
    response.code(201);
    return response;
   }
   const response=h.response({
    status:'error',
    message: 'Buku gagal ditambahkan',
   });
   response.code(500);
   return response;
};

//delete books
const deleteBooksHandler =(request, h) => {
    const {id} = request.params;
    const index = books.findIndex((book) => book.id === id);

    if(index !== -1){
        books.splice(index, 1);
        const response = h.response({
            status:'success',
            message:'Buku berhasil dihapus',
        });

        response.code(200);
        return response;
    }else{
    const response = h.response({
        status:'fail',
        message:'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}
};

//list berdasarkan id
const getBooksById = (request, h) => {
    const { id } =request.params;

    const book = books.filter((n) => n.id === id)[0];
    if (book !== undefined){
        return {
            status:'success',
            data: { 
                book,
             },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

//update buku
const editBooksHandler = (request, h) => {
    const { id } = request.params;
    

    const {name,year,author, summary, publisher, pageCount, readPage, reading } =request.payload;

    const updatedAt= new Date().toISOString();

    const index =books.findIndex((book) => book.id === id);


    if((name === undefined)|| (name === "") || (name === null)){
        const response=h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }else if( pageCount < readPage ){
        const response =h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;

    }

    if (index !== -1){
        books[index]={
          ...books[index],  name,year,author, summary, publisher, pageCount, readPage, reading, updatedAt,
        };
        const response=h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response=h.response({
status:'fail',
message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
response.code(404);
return response;

};

module.exports={getAllBooksHandler,addBooksHandler,deleteBooksHandler,getBooksById,editBooksHandler};