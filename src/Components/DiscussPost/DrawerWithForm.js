import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";

export function DrawerWithForm({ open, setOpen }) {
  const closeDrawer = () => setOpen(false);
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <React.Fragment>
      <Drawer size={700} open={open}>
        <div className="flex items-center justify-between px-4 pb-2">
          <Typography variant="h5" color="blue-gray">
            Fill Details
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        {/* <div className="mb-5 px-4">
          <Typography variant="small" color="gray" className="font-normal ">
            Write the message and then click button.
          </Typography>
        </div> */}
        <form className="flex flex-col gap-6 p-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Title
          </Typography>
          <Input type="text" label="Enter topic title..." />
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => {setContent(newContent)}}
          />
          <Button>Post</Button>
        </form>
      </Drawer>
    </React.Fragment>
  );
}
