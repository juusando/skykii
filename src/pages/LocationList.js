import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getSavedLocations, removeLocation } from '../utils/locationStorage';
import SvgIcon from './SvgIcon';

const LocationList = () => {
    const navigate = useNavigate();
    const [locations, setLocations] = useState(getSavedLocations());
    const [swipedId, setSwipedId] = useState(null);
    const [touchStart, setTouchStart] = useState(null);

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e, locationKey) => {
        if (!touchStart) return;
        
        const currentTouch = e.touches[0].clientX;
        const diff = touchStart - currentTouch;

        if (diff > 50) {
            setSwipedId(locationKey);
        } else if (diff < -50) {
            setSwipedId(null);
        }
    };

    const handleTouchEnd = () => {
        setTouchStart(null);
    };

    const handleDelete = (locationKey) => {
        removeLocation(locationKey);
        setLocations(getSavedLocations());
        setSwipedId(null);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(locations);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setLocations(items);
        localStorage.setItem('savedLocations', JSON.stringify(items));
    };

    if (locations.length === 0) {
        return null;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="locations">
                {(provided) => (
                    <div 
                        className="location-grid"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {locations.map((location, index) => {
                            const locationKey = `${location.latitude}-${location.longitude}`;
                            return (
                                <Draggable 
                                    key={locationKey}
                                    draggableId={locationKey}
                                    index={index}
                                >
                                    {(dragProvided) => (
                                        <div
                                            className="location-card"
                                            ref={dragProvided.innerRef}
                                            {...dragProvided.draggableProps}
                                            {...dragProvided.dragHandleProps}
                                            style={{
                                                ...dragProvided.draggableProps.style,
                                                transform: `translateX(${swipedId === locationKey ? '-100px' : '0px'})`,
                                                transition: 'transform 0.3s ease'
                                            }}
                                            onTouchStart={handleTouchStart}
                                            onTouchMove={(e) => handleTouchMove(e, locationKey)}
                                            onTouchEnd={handleTouchEnd}
                                            onClick={() => {
                                                if (swipedId !== locationKey) {
                                                    navigate(`/weather/${location.latitude}/${location.longitude}/${encodeURIComponent(location.name)}`);
                                                }
                                            }}
                                        >
                                            <div className="location-info">
                                                <div className="city">{location.name}</div>
                                                <div className="country">{location.country}</div>
                                            </div>
                                            <SvgIcon name="add" className="icon"/>
                                            {swipedId === locationKey && (
                                                <div 
                                                    className="delete-action"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(locationKey);
                                                    }}
                                                >
                                                    <SvgIcon name="delete" />
                                                    Delete
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default LocationList;