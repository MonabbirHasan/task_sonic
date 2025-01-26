import React from "react";
import "./task_card.css";
import { Avatar, Chip, Stack } from "@mui/material";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
 const TaskCard = ({
  title,
  price,
  location,
  flexible,
  date,
  requested,
  status,
  author_img = false,
  author = "E",
  author_name = "",
  onClick,
}) => {
  return (
    <div className="task_card" onClick={onClick}>
      {/* CARD HEADER */}
      <div className="task_card_head">
        <Stack direction="row" justifyContent="space-between">
          <p className="task_card_title">{title}</p>
          <p className="task_card_price">{price}</p>
        </Stack>
      </div>
      {/* CARD BODY */}
      <div className="task_card_list">
        <Stack direction="row" spacing={1} alignItems="center">
          <svg fill="#9BA0BC" height="16" width="16" viewBox="0 0 24 24">
            <mask
              id="a"
              width="24"
              height="24"
              x="0"
              y="0"
              maskUnits="userSpaceOnUse"
            >
              <path d="M0 0h24v24H0z"></path>
            </mask>
            <g mask="url(#a)">
              <path d="M2 20v-3h2V6c0-.55.196-1.02.588-1.412A1.923 1.923 0 0 1 6 4h15v2H6v11h6v3H2Zm13 0a.965.965 0 0 1-.712-.288A.965.965 0 0 1 14 19V9c0-.283.096-.521.288-.713A.967.967 0 0 1 15 8h6a.97.97 0 0 1 .712.287c.192.192.288.43.288.713v10c0 .283-.096.52-.288.712A.965.965 0 0 1 21 20h-6Zm1-3h4v-7h-4v7Z"></path>
            </g>
          </svg>
          <span className="task_card_list_item">{location}</span>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <svg fill="#9BA0BC" height="16" width="16" viewBox="0 0 24 24">
            <path
              fill-rule="evenodd"
              d="M12.725 17.275c.483.483 1.075.725 1.775.725s1.292-.242 1.775-.725c.483-.483.725-1.075.725-1.775s-.242-1.292-.725-1.775C15.792 13.242 15.2 13 14.5 13s-1.292.242-1.775.725C12.242 14.208 12 14.8 12 15.5s.242 1.292.725 1.775Zm-9.138 4.138A1.93 1.93 0 0 0 5 22h14a1.93 1.93 0 0 0 1.413-.587A1.93 1.93 0 0 0 21 20V6c0-.55-.196-1.02-.587-1.412A1.927 1.927 0 0 0 19 4h-1V2h-2v2H8V2H6v2H5c-.55 0-1.021.196-1.413.588A1.925 1.925 0 0 0 3 6v14c0 .55.196 1.021.587 1.413ZM19 20H5V10h14v10Zm0-12H5V6h14v2Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="task_card_list_item">{date}</span>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <svg fill="#9BA0BC" height="16" width="16" viewBox="0 0 24 24">
            <path
              fill-rule="evenodd"
              d="m16.7 15.3-1.4 1.4-4.3-4.3V7h2v4.6l3.7 3.7Zm-8.6 5.912A9.733 9.733 0 0 0 12 22a9.733 9.733 0 0 0 3.9-.788 10.092 10.092 0 0 0 3.175-2.137c.9-.9 1.612-1.958 2.137-3.175A9.733 9.733 0 0 0 22 12a9.733 9.733 0 0 0-.788-3.9 10.092 10.092 0 0 0-2.137-3.175c-.9-.9-1.958-1.613-3.175-2.138A9.743 9.743 0 0 0 12 2a9.743 9.743 0 0 0-3.9.787 10.105 10.105 0 0 0-3.175 2.138c-.9.9-1.612 1.958-2.137 3.175A9.732 9.732 0 0 0 2 12a9.74 9.74 0 0 0 .788 3.9 10.091 10.091 0 0 0 2.137 3.175c.9.9 1.958 1.612 3.175 2.137Zm9.563-3.549C16.104 19.221 14.217 20 12 20s-4.104-.779-5.662-2.337C4.779 16.104 4 14.217 4 12s.78-4.104 2.338-5.663C7.896 4.779 9.783 4 12 4s4.104.779 5.663 2.337C19.221 7.896 20 9.783 20 12s-.779 4.104-2.337 5.663Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="task_card_list_item">{flexible}</span>
        </Stack>
      </div>
      {/* CARD FOOTER */}
      <div className="card_footer">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={1} mt={2} alignItems="center">
            <Chip
              style={{
                color: "var(--text-color)",
                background:
                  status == "open"
                    ? "var(--primary-color)"
                    : status == "assigned"
                    ? "var(--secondary-color)"
                    : status == "completed"
                    ? "var(--success-color)"
                    : "var(--error-color)",
              }}
              label={status}
            />
            <span>•</span>
            <span className="task_card_quoto_badge">{requested} requests</span>
          </Stack>
          {author_img == true ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">{author_name}</Tooltip>}
            >
              <Avatar className="task_card_author" src={author} />
            </OverlayTrigger>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">{author_name}</Tooltip>}
            >
              <Avatar className="task_card_author" />
            </OverlayTrigger>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default TaskCard;
