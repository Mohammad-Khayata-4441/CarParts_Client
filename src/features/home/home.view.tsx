import { PlusOne, Refresh } from "@mui/icons-material";
import { Button, Paper } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("effect");
  });

  const resetCounter = () => {
    setCounter(0);
  };
  return (
    <Paper sx={{ p: 2 }}>
      <h1>Home Page {counter}</h1>
      <Button
        onClick={() => {
            setCounter((o) => o + 1);
        }}
      >
        <PlusOne></PlusOne>
      </Button>
      <Button onClick={() => resetCounter()}>
        <Refresh></Refresh>
      </Button>
    </Paper>
  );
};

export default function Home() {

  return (
    <div>
      <div className="grid grid-cols-2 container mx-auto max-w-screen-lg gap-4">
 
      </div>
    </div>
  );
}
