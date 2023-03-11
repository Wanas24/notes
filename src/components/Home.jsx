import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2'


export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState({
    title: "",
    desc: "",
  });

  useEffect(() => {
    getUserNotes();
  }, []);

  function getNote({ target }) {
    setNote({ ...note, [target.name]: target.value });
  }

  async function addNote(e) {
    e.preventDefault();
    console.log(note);
    let decoded = jwt_decode(localStorage.getItem("token"));
    console.log(decoded);
    let { data } = await axios.post(
      "https://route-movies-api.vercel.app/addNote",
      {
        ...note,
        token: localStorage.getItem("token"),
        userID: decoded._id,
      }
    );
    if (data.message == "success") {
      getUserNotes();
      Swal.fire('Added!', '', 'success')
    }
    console.log(data);
  }

  async function deleteNote(noteID) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            (async () => {
                let { data } = await axios.delete("https://route-movies-api.vercel.app/deleteNote", {
                    data: {
                        "NoteID": noteID,
                        "token": localStorage.getItem("token")
                    }
                })

                if (data.message == "deleted") {
                    getUserNotes()
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your note has been deleted.',
                        'success'
                    )
                }
            })();


        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your note is safe :)',
                'error'
            )
        }
    })




}

function getNoteId(index){
  console.log(notes[index]);
  document.querySelector("#exampleModal1 input").value=notes[index].title;
  document.querySelector("#exampleModal1 textarea").value=notes[index].desc;
  setNote({...note,"token":localStorage.getItem('token'),"title":notes[index].title,"desc":notes[index].desc,"NoteID":notes[index]._id});

}
async function editNote(e){
  e.preventDefault();
  let { data } = await axios.put('https://route-movies-api.vercel.app/updateNote', note);
  console.log(data);
  if (data.message == "updated") {
    getUserNotes();
    Swal.fire('Updated!', '', 'success')
  }
  
}

  async function getUserNotes() {
    let decoded = jwt_decode(localStorage.getItem("token"));
    console.log(decoded);
    let { data } = await axios.get(
      "https://route-movies-api.vercel.app/getUserNotes",
      {
        headers: {
          token: localStorage.getItem("token"),
          userID: decoded._id,
        },
      }
    );
    if (data.message == "success") {
      setNotes(data.Notes);
    }
    if (data.message == "no notes found") {
      setNotes([]);
    }

    console.log(notes);
    setIsLoading(false)
  }

  return (
    <>
      <div className="container my-5">
        <div className="col-md-12 text-end">
          <a
            className="add p-2 btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="fas fa-plus-circle"></i> Add New
          </a>
        </div>
      </div>

      {/* <!-- Add Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form id="add-form" onSubmit={addNote}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  onChange={getNote}
                  placeholder="Type Title"
                  name="title"
                  className="form-control"
                  type="text"
                />
                <textarea
                  onChange={getNote}
                  className="form-control my-2"
                  placeholder="Type your note"
                  name="desc"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  data-bs-dismiss="modal"
                  type="submit"
                  className="btn btn-info"
                >
                  <i className="fas fa-plus-circle"></i> Add Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* <!-- Edit Modal --> */}
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form id="edit-form" onSubmit={editNote}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                onChange={getNote}
                  placeholder="Type Title"
                  name="title"
                  className="form-control"
                  type="text"
                />
                <textarea
                onChange={getNote}
                  className="form-control my-2"
                  placeholder="Type your note"
                  name="desc"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  data-bs-dismiss="modal"
                  type="submit"
                  className="btn btn-info"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* <!-- ==========================Notes=============================== --> */}
      <div className="container">
        <div className="row">
          {notes.map((note,index) => {
            return (
              <div key={index} className="col-md-4 my-4">
                <div className="note p-4">
                  <h3 className="float-start">{note.title}</h3>
                  <a data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={()=>{getNoteId(index)}}>
                    <i  className="fas fa-edit float-end edit"></i>
                  </a>
                  <a onClick={()=>{deleteNote(note._id)}}>
                    
                    <i className="fas fa-trash-alt float-end px-3 del"></i>
                  </a>
                  <span className="clearfix"></span>
                  <p>{note.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        {notes.length == 0 &&!isLoading ? (
          <div className="row">
            <h2 className="text-white text-center">no notes found</h2>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
