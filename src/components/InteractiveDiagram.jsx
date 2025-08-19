import React, { useState } from 'react';
import { X } from 'lucide-react';
import { hotspotData } from '../data/data.js';
import styles from './InteractiveDiagram.module.css';

/**
 * InteractiveDiagram Component
 * 
 * A responsive component that displays a background image with invisible,
 * clickable hotspots that trigger modals with content and embedded videos.
 */
const InteractiveDiagram = () => {
  // State to track the currently active hotspot
  const [activeHotspot, setActiveHotspot] = useState(null);

  /**
   * Handle hotspot click - sets the active hotspot to show modal
   * @param {Object} hotspot - The hotspot data object
   */
  const handleHotspotClick = (hotspot) => {
    setActiveHotspot(hotspot);
  };

  /**
   * Close the modal by resetting active hotspot to null
   */
  const closeModal = () => {
    setActiveHotspot(null);
  };

  /**
   * Handle background overlay click to close modal
   * @param {Event} e - Click event
   */
  const handleOverlayClick = (e) => {
    // Only close if clicking the overlay itself, not its children
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.container}>
      {/* Main diagram container with background image */}
      <div className={styles.diagramContainer}>
        {/* Map over hotspot data to create invisible clickable areas */}
        {hotspotData.map((hotspot) => (
          <button
            key={hotspot.id}
            className={styles.hotspot}
            style={{
              top: hotspot.position.top,
              left: hotspot.position.left,
              width: hotspot.position.width,
              height: hotspot.position.height,
            }}
            onClick={() => handleHotspotClick(hotspot)}
            aria-label={`Open ${hotspot.title} information`}
            title={hotspot.title} // Tooltip on hover
          />
        ))}
      </div>

      {/* Modal - conditionally rendered when activeHotspot exists */}
      {activeHotspot && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            {/* Modal header with title and close button */}
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{activeHotspot.title}</h2>
              <button
                className={styles.closeButton}
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal body with description and video */}
            <div className={styles.modalBody}>
              <p className={styles.modalDescription}>
                {activeHotspot.description}
              </p>
              
              {/* Embedded video iframe */}
              {activeHotspot.videoUrl ? (
              // If a videoUrl exists, render the video player
              <div className={styles.videoContainer}>
                <iframe
                  src={activeHotspot.videoUrl}
                  title={activeHotspot.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.videoIframe}
                />
              </div>
            ) : activeHotspot.imageUrl ? (
              // If an imageUrl exists, render the image
              <div className={styles.imageContainer}>
                <img 
                  src={activeHotspot.imageUrl} 
                  alt={activeHotspot.title} 
                  className={styles.modalImage} 
                />
              </div>
            ) : null} 
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveDiagram;