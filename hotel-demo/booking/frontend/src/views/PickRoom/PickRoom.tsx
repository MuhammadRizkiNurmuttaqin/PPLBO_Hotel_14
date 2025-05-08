/*
 * Copyright (c) 2020-2020. AxonIQ
 *
 * Licensed under the Apache License, Version 2.0 (the &quot;License&quot;)
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { getRoom } from "../../services/room/room";
import Typography from "@material-ui/core/Typography";

export const PickRoom = () => {
  const history = useHistory();
  const [roomNumber, setRoomNumber] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!roomNumber || roomNumber === "") {
      alert("Please enter a room number!");
      return null;
    }

    try {
      await getRoom(roomNumber);

      history.push(`book-room/${roomNumber}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <>
      <Typography variant="h5">Pick a Room</Typography>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid item lg={4} sm={12}>
              <TextField
                label="Room Number"
                name="roomNumber"
                onChange={(event) => setRoomNumber(event.target.value)}
                fullWidth
                required
                autoFocus
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div className="register__actions">
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
