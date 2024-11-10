// import multer from "multer";


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/temp')
//     },
//     filename: function (req, file, cb) {
//         //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname)
//     }
// })

// // function fileFilter(req, file, cb) {

// //     const maxSize = 1024*200;

// //     if(file.size < maxSize){
// //         cb(null, true)
// //     }
// //     else{
// //         cb(null, false)
// //     }


// //     // The function should call `cb` with a boolean
// //     // to indicate if the file should be accepted

// //     // To reject this file pass `false`, like so:
// //     // cb(null, false)

// //     // To accept the file pass `true`, like so:
// //     // cb(null, true)

// //     // You can always pass an error if something goes wrong:
// //     // cb(new Error('I don\'t have a clue!'))

// // }

// export const upload = multer({ 
//     storage: storage,
//     // fileFilter: fileFilter 
// })