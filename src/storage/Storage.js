import React, { memo, useState, useEffect } from "react";
import axios from "../axios";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./Storage.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Storage(props) {
  const [device, setDevice] = useState("");
  const [list, setList] = useState([]);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getListing() {
      getAllStorageDevices();
    }
    getListing();
  }, []);

  const getAllStorageDevices = async () => {
    const devicesList = await axios.get("storage");
    setList(devicesList.data);
  };

  const addHandler = async () => {
    setId("");
    setOpen(true);
    setDevice("");
  };

  const addDevice = async () => {
    const deviceAdd = await axios.post("storage/", {
      name: device,
    });

    if (deviceAdd.data.error) return alert(deviceAdd.data.error.message);
    getAllStorageDevices();
    setOpen(false);
  };

  const updateHandler = async (e, id) => {
    e.preventDefault();
    setId(id);
    const storageUpd = await axios.get(`/storage/${id}`);
    if (storageUpd.data.error) return alert(storageUpd.data.error.message);
    setDevice(storageUpd.data.name);
    setOpen(true);
  };

  const updateDevice = async (e) => {
    e.preventDefault();

    const deviceData = await axios.put(`/storage/${id}?name=${device}`);
    if (deviceData.data.error) return alert(deviceData.data.error.message);
    setDevice(deviceData.data.name);
    getAllStorageDevices();
    setOpen(false);
  };

  const deleteHandler = async (e, id) => {
    const deleteDevice = await axios.delete(`storage/${id}`);
    if (deleteDevice.data.error) return alert(deleteDevice.data.error.message);
    getAllStorageDevices();
  };

  const checkoutHandler = async() => {
    const deleteDevice = await axios.get(`storage/checkout`);
    if (deleteDevice.data.error) return alert(deleteDevice.data.error.message);
    getAllStorageDevices();
  };

  return (
    <div className="storage">
      <div className="storage__add">
        <Button
          className="sto__add"
          type="submit"
          variant="contained"
          color="primary"
          onClick={(e) => addHandler(e)}
        >
          ADD DEVICE
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>STORAGE ID</th>
            <th>STORAGE NAME</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0
            ? list.map((device) => (
                <tr key={device.storageId}>
                  <td>{device.storageId}</td>
                  <td>{device.name}</td>
                  <td>
                    <Button
                      className="storage__update"
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={(e) => updateHandler(e, device.storageId)}
                    >
                      update
                    </Button>
                    <Button
                      className="storage__delete"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      onClick={(e) => deleteHandler(e, device.storageId)}
                    >
                      Delete
                    </Button>
                    <Button
                      className="storage__checkout"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      onClick={(e) => checkoutHandler(e, device.storageId)}
                    >
                      Checkout
                    </Button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <section className="category__update__section">
              <form className="category__form">
                <FormControl className="category__input">
                  <InputLabel>Device Name</InputLabel>
                  <Input
                    id="my-input"
                    aria-describedby="my-helper-text"
                    autoComplete="off"
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                  />
                </FormControl>
                {!id ? (
                  <Button
                    className="category__submit"
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={(e) => addDevice(e)}
                  >
                    ADD DEVICE
                  </Button>
                ) : (
                  <Button
                    className="category__submit"
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={(e) => updateDevice(e)}
                  >
                    UPDATE DEVICE
                  </Button>
                )}
              </form>
            </section>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Storage;
