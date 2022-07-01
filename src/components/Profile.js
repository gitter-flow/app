import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Profile = () => {

  const { bookId } = useParams();
  const dispatch = useDispatch();

  // {
  //   "id": "ee70149e-64c3-4772-942e-9017c32a8477",
  //   "username": "f@gmail.com",
  //   "numberOfFollowers": 0,
  //   "numberOfFollows": 0
  // }

  useEffect(() => {
  }, []);

  return book ? (
    <div className="row">
      <div className="col-sm-12">
        <p> toto
        </p>
      </div>
    </div>
  ) : null
}

export default Profile
