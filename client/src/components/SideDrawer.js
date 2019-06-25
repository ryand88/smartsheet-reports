import React from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import BuildIcon from "@material-ui/icons/Build";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function ResponsiveDrawer(props) {
  const {
    mobileOpen,
    setMobileOpen,
    container,
    beginDateFilter = new Date(),
    endDateFilter = new Date(),
    setBeginDateFilter,
    setEndDateFilter,
    isDateFilter,
    toggleDateFilter,
    completionDaysGoal,
    setCompletionDaysGoal,
    whoFixed,
    whoFixedList,
    whoInverse,
    whoSelectOnChange,
    emergencyFilter,
    setEmergencyFilter
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      {!mobileOpen && <div className={classes.toolbar} />}
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <FormControlLabel
            control={
              <Checkbox
                checked={isDateFilter}
                onChange={() => toggleDateFilter(!isDateFilter)}
                value="checkedB"
                color="primary"
              />
            }
            labelPlacement="end"
            label="Filter by Date?"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <span />
          </ListItemIcon>
          <TextField
            id="date"
            label="Begin Filter"
            type="date"
            value={
              beginDateFilter.getDate()
                ? beginDateFilter.toISOString().substring(0, 10)
                : ""
            }
            onChange={e => setBeginDateFilter(new Date(e.target.value))}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <span />
          </ListItemIcon>
          <TextField
            id="date"
            label="End Filter"
            type="date"
            value={
              endDateFilter.getDate()
                ? endDateFilter.toISOString().substring(0, 10)
                : ""
            }
            onChange={e => setEndDateFilter(new Date(e.target.value))}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <WhatshotIcon />
          </ListItemIcon>
          <FormControlLabel
            control={
              <Checkbox
                checked={emergencyFilter}
                onChange={() => setEmergencyFilter(!emergencyFilter)}
                value="checkedB"
                color="primary"
              />
            }
            labelPlacement="end"
            label="Emergency Only"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <WatchLaterIcon />
          </ListItemIcon>
          <TextField
            id="standard-number"
            label="Days to completion"
            value={completionDaysGoal}
            onChange={e => setCompletionDaysGoal(e.target.value)}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <span>
            <InputLabel
              htmlFor="whoFixed"
              style={{ color: whoInverse ? "red" : "gray" }}
            >
              {whoInverse ? "Exclude" : "Who fixed it?"}
            </InputLabel>
            <Select
              value={whoFixed}
              onChange={e => whoSelectOnChange(e)}
              inputProps={{
                name: "who",
                id: "whoFixed"
              }}
            >
              <MenuItem value="showAll">
                <em>Show All</em>
              </MenuItem>
              {whoFixedList.map(who => (
                <MenuItem key={who} value={who}>
                  {who}
                </MenuItem>
              ))}
            </Select>
          </span>
        </ListItem>
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="Mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => setMobileOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
