import * as React from 'react';
import { useContext } from "react";
import FixedTagsContext from './FixedTagsContext'
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function FixedTags(props) {
  const fixedOptions = [];
  const { activityTags:value, setActivityTags:setValue } = useContext(FixedTagsContext);

  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...fixedOptions,
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ]);
      }}
      options={top100Films}
      disabled={value.length>=5?true:false}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip key={index} label={option.title} {...getTagProps({ index })}
            disabled={fixedOptions.indexOf(option) !== -1}
          />
        ))
      }
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label={props.label} placeholder="Acitvities" />
      )}
    />
  );
}

const dateIdeas = [
  'Dinner', 'Movie', 'Coffee', 'Walk', 'Picnic', 'Concert', 'Museum', 'Biking', 'Hiking', 'Beach',
  'Art', 'Wine', 'Gardening', 'Cooking', 'Volunteering', 'Bowling', 'Karaoke', 'Theater', 'Sightseeing',
  'Dance', 'Ice Skating', 'Camping', 'Stargazing', 'Board Games', 'Picnic', 'Winery',
  'Botanical Garden', 'Aquarium', 'Rock Climbing', 'Paddleboarding', 'Kayaking', 'Beach Volleyball',
  'Bike Ride', 'Photography', 'Yoga', 'Pottery', 'Hot Air Balloon', 'Painting', 'Escape Room',
  'Geocaching', 'Fishing', 'Antique Shopping', 'Cooking Class', 'Zoo', 'Ice Cream', 'Sunset/Sunrise',
  'Golfing', 'Paddle Boating', 'Farm Visit', 'Ghost Tour', 'Horseback Riding', 'Bookstore Crawl',
  'Virtual Reality', 'Beach Bonfire', 'Wine Tasting', 'Candlelit Dinner', 'Salsa Dancing', 'Coffee Tasting',
  'Brewery Tour', 'Comedy Show', 'Indoor Trampoline', 'Foodie Adventure', 'Road Trip', 'Themed Costume Party',
  'Rooftop Bar', 'Science Museum', 'Laser Tag', 'Concert in the Park', 'Dance Class', 'Fruit Picking',
  'Apple Orchard Visit', 'Indoor Mini Golf', 'Play Board Games', 'Silent Disco', 'Charity Run/Walk',
  'Trampoline Park', 'Water Park', 'Outdoor Concert', 'Pumpkin Patch Visit', 'Murder Mystery Dinner',
  'Outdoor Yoga', 'Live Music Venue', 'Bike and Brew Tour', 'Outdoor Movie Night', 'Tasting Menu Dinner',
  'Art Museum', 'Gardening Workshop', 'Outdoor Paintball', 'Bike Trail Ride',
  'Meditation Session', 'Potluck Dinner', 'Visit a Local Festival', 'Sightseeing Tour', 'Outdoor Scavenger Hunt',
  'Indoor Rock Climbing', 'Food Cooking Challenge', 'Historical Site Visit', 'Beach Cleanup',
  'Bonsai Tree Planting', 'DIY Craft Workshop', 'Star Gazing Night', 'Outdoor Photography',
  'Bird Watching', 'Conservation Volunteer', 'Guided Walking Tour', 'Nature Trail Hiking',
  'Live Theater Performance', 'Playground Fun', 'Ice Cream Making', 'Local Farmers\' Market',
  'Outdoor Art Installation', 'Beach Bonfire with S\'mores', 'Bike Rental and Ride', 'Nature Reserve Visit',
  'Paddleboard Yoga Class', 'Cooking a Romantic Meal', 'Plant Shopping and Gardening',
  'Outdoor Adventure Park', 'Winery Picnic', 'Bike Ride to a Picnic Spot', 'Gourmet Chocolate Tasting',
  'Sunset Cruise', 'Board Game Night at a Cafe'
];

let top100Films = new Set(dateIdeas)
top100Films = Array.from(top100Films)
top100Films = top100Films.map((item,i)=>{ return {title:item,} })

