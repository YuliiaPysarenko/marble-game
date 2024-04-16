import { useContext, useEffect, useState } from "react";
import { Modal } from "../components";
import { ref, set } from "firebase/database";
import { DBContext, UserContext, RECORDS_PATH } from "../utils/firebase/const";

export default function EditUserData({ closeFn = () => null, open = false }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const db = useContext(DBContext);
  const user = useContext(UserContext);
  const recordsRef = ref(db, RECORDS_PATH + user.uid);

  const handleInput = (e) => setName(e.target.value);

  useEffect(() => {
    // console.log(user);
    getRecordValue();
  }, [user]);

  const getRecordValue = () => {
    setName(user.publicName || user.displayName);
  };

  const sendRecordValue = (e) => {
    e.preventDefault();
    console.log(name);
    set(recordsRef, {
      ...user,
      publicName: name,
    });
    closeModal();
  };

  const closeModal = () => {
    setError("");

    if (!name) {
      return setError("Please	enter your name");
    }
    if (name && name.length < 3) {
      return setError("Your name is too short");
    }
    if (name && name.length > 30) {
      return setError("Your name is too long");
    }
    closeFn();
  };

  return (
    <Modal open={open}>
      <div className="modal">
        <form>
          <h2>
            Please, confirm your name <br />
            (or nickname):
          </h2>
          <div className="form-field">
            <input
              type="text"
              placeholder="Your name"
              id="publicName"
              onInput={handleInput}
              value={name}
            />
            <p className="error">{error}</p>
          </div>
          <input
            type="submit"
            id="confirm"
            onClick={sendRecordValue}
            value={"Go!"}
          />
        </form>
      </div>
    </Modal>
  );
}
