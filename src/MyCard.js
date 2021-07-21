import React from "react";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { DateTime } from "luxon";
import L from "leaflet";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "275",
    width: "960",
    textAlign: "center"
  },
  
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(90deg)"
  }
}));

export default function MyCard({ details }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [countryDetails, setcountryDetails] = useState();
  const [isCardLoading, setisCardLoading] = useState(true);
  const position = [details.location.lat, details.location.lng];

  
  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/alpha/${details.location.country}`)
      .then((res) => res.json())
      .then((data) => {
        setcountryDetails(data);
        setisCardLoading(false);
      });
  }, []);
  console.log(countryDetails);

  const markerIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png",
    iconSize: [22, 41]
  });

  // var local = DateTime.local();
  // var rezoned = local.setZone("Europe/Paris");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return isCardLoading ? (
    <h2>{details.ip}</h2>
  ) : (
    <div
      style={{ display: "flex", justifyContent: "center", Width: "1280px" }}
    >
      <Card className={classes.root} width="1280px">
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={countryDetails.flag}
            >
              {details.location.country}
            </Avatar>
          }
          title={details.location.city + ", " + details.location.region}
          subheader={new Date().toLocaleString() + ""}
        />

        <CardContent>
          {/*  */}
          
           <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={markerIcon} position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          
          
          <Typography variant="body2" color="textSecondary" >
            <h2>Your IP:{details.ip}</h2>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" orientation={'horizontal'} unmountOnExit>
          <CardContent>
            <Typography paragraph>Some Interesting Facts!</Typography>
            <Typography paragraph>Capital City: {countryDetails.capital}</Typography>

          </CardContent>
        </Collapse>
      </Card>
     </div>
  );
}
