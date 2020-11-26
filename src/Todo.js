import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, FormControl, List, Paper, TextField, Typography } from '@material-ui/core';
import React, {useState, useEffect} from "react";
import { db } from "./firebase";
import TaskItem from "./TaskItem";

const Todo = () => {
    const useStyles = makeStyles((theme) => ({
        text: {
          padding: theme.spacing(2, 2, 0),
        },
        paper: {
          paddingBottom: 50,
          marginTop: 30,
        },
        list: {
          marginBottom: theme.spacing(2),
        },
        button: {
          margin: theme.spacing(1),
        },
        input:{
          margin: theme.spacing(2, 2, 0),

        },
        container:{
          marginTop: 7,
        },
        subheader: {
          backgroundColor: theme.palette.background.paper,
        },
    }));
    
    const [data, setData] = useState([{ id: "", title: "", content:"", date:"", time:"" }]);
    const [titleValue, setTitleValue] = useState("");
    const [contentValue, setContentValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [timeValue, setTimeValue] = useState("");
  
    // インプットフォームイベント
    const handleTitleChange=(e)=>{
      console.log(e, "event");
      setTitleValue(e.target.value);
    };
    const handleContentChange=(e)=>{
      console.log(e, "event");
      setContentValue(e.target.value);
    };
    const handleTimeChange=(e)=>{
      console.log(e, "event");
      setTimeValue(e.target.value);
    };
    const handleDateChange=(e)=>{
      console.log(e, "event");
      setDateValue(e.target.value);
    };
  
    // 登録イベント
    const addInputData =()=>{

      // dbのtodosに足す
      db.collection("todos").add({ title: titleValue, content: contentValue, time: timeValue, date: dateValue });
      // inputを空に
      setTitleValue("");
      setContentValue("");
      setDateValue("");
      setTimeValue("");
      console.log(setDateValue);
    };
    // useEffectはページが表示された後に1回だけ走る処理
    useEffect(()=> {
        // onSnapshotはfirebaseの処理。dbに変更があったら、snapshotにデータが入る
        const firebaseData = db.collection("todos")
        .orderBy("date", "asc").onSnapshot((snapshot) => {
        // 変更があったものを登録（更新）
        setData(
            // mapで全てを展開(dataに入る)
            snapshot.docs.map((dbData) => ({
            // 階層を指定して取得する
            id: dbData.id,
            title: dbData.data().title,
            content: dbData.data().content,
            date: dbData.data().date,
            time: dbData.data().time,
            }))
        );
        });
    return () => firebaseData();
  }, []); //なんか足した
  console.log(data);

    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <div className={classes.input}>
            <form className={classes.container} noValidate>
              <TextField
                id="date"
                label="Date"
                type="date"
                value={dateValue}
                required
                onChange={handleDateChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
            <form className={classes.container} noValidate>
              <TextField
                id="time"
                label="Time"
                type="time"
                required
                className={classes.textField}
                value={timeValue}
                onChange={handleTimeChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </form>

              <div>
                <FormControl >
                {/* inputタグ */}
                <TextField
                  required
                  label="Title"
                  value={titleValue}
                  onChange={handleTitleChange}
                />
                </FormControl>
              </div>
              <div>
                <FormControl >
                <TextField
                  label="Content"
                  required
                  value={contentValue}
                  onChange={handleContentChange}
                  multiline
                  rowsMax={4}
                />
                </FormControl>
            {/* 登録の処理  disabledでinputがカラだと押せなくする*/}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={!titleValue && !contentValue}
                onClick={addInputData}
              >
                Send
              </Button>
              </div>
            </div>

        {/* 表示 */}
            <Paper square className={classes.paper}>
                <Typography className={classes.text} variant="h5" gutterBottom>
                Todo
                </Typography>
                <List className={classes.list}>
                {data.map((dataItem) => (
                  <>
                    <TaskItem id={dataItem.id} title={dataItem.title} content={dataItem.content} date={dataItem.date} time={dataItem.time}/>
                  </>
                ))}
                </List>
            </Paper>
        </>
    )
}

export default Todo


