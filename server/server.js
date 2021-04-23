require("dotenv").config();
const mongoose = require("mongoose");
const Document = require("./document");
const io = require("socket.io")(3001, {
  cors: {
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST"],
  },
});

mongoose.connect(process.env.MONGOOSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

io.on("connection", (socket) => {
  socket.on("get-document", async (id) => {
    try {
      const document = await findDocument(id);
      socket.emit("load-document", document.data);
      socket.join(id);
      socket.on("send-changes", (delta) => {
        socket.broadcast.to(id).emit("receive-changes", delta);
      });
      socket.on("save-document", async (data) => {
        await Document.findByIdAndUpdate(id, { data });
      });
    } catch (error) {
      console.error(error);
      socket.emit("initial-error", "The Document does not found!");
    }
  });
  socket.on("joining-room", async (id) => {
    const docs = await Document.findById(id);
    try {
      socket.join(id);
      socket.emit("join-document", docs.data);
    } catch (error) {
      console.error(error);
      socket.emit("error", "Entered document ID does not exists!");
    }
  });

  socket.on("creating-room", async (id) => {
    const createdDocument = await Document.create({ _id: id, data: "" });
    socket.emit("create-document", createdDocument);
  });
});

async function findDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
}
