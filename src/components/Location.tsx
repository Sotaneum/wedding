import { useEffect, useRef, useState } from "react";
import "./Location.css";

interface LocationProps {
  venueName: string;
  address: string;
  addressJibun: string;
  websiteUrl: string;
  mapCenter: { lat: number; lng: number };
  markerPosition: { lat: number; lng: number };
  loadingText?: string;
  sketchImageUrl: string;
  venueLogo: string;
  mapTabLabel?: string;
  sketchTabLabel?: string;
  title?: string;
}

function Location({
  venueName,
  address,
  addressJibun,
  websiteUrl,
  mapCenter,
  markerPosition,
  loadingText = "지도 로딩 중...",
  sketchImageUrl,
  venueLogo,
  mapTabLabel = "지도",
  sketchTabLabel = "약도",
  title = "오시는 길",
}: LocationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"map" | "sketch">("map");

  useEffect(() => {
    if (activeTab === "map" && ref.current && window.kakao?.maps) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(ref.current, mapOption);

      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(
          markerPosition.lat,
          markerPosition.lng,
        ),
      });

      const content = document.createElement("div");
      content.innerHTML =
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        `            ${venueName}` +
        '            <div class="close" title="닫기"></div>' +
        "        </div>" +
        '        <div class="body">' +
        '            <div class="img" style="background-color: #42693c;justify-content: center;display: flex;align-items: center;">' +
        `                <img src="${venueLogo}" width="73" height="35" alt="웨딩홀 로고">` +
        "           </div>" +
        '            <div class="desc">' +
        `                <div class="ellipsis">${address}</div>` +
        `                <div class="jibun ellipsis">${addressJibun}</div>` +
        `                <div><a href="${websiteUrl}" target="_blank" rel="noreferrer" class="link">홈페이지</a></div>` +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";

      const overlay = new window.kakao.maps.CustomOverlay({
        content,
        map: map,
        position: marker.getPosition(),
      });

      const closeBtn = content.querySelector(".close");
      const handleClose = () => overlay.setMap(null);
      closeBtn?.addEventListener("click", handleClose);

      const handleMarkerClick = () => {
        overlay.setMap(map);
      };
      window.kakao.maps.event.addListener(marker, "click", handleMarkerClick);

      return () => {
        closeBtn?.removeEventListener("click", handleClose);
        overlay.setMap(null);
      };
    }
  }, [
    activeTab,
    mapCenter,
    markerPosition,
    venueName,
    address,
    addressJibun,
    websiteUrl,
    venueLogo,
  ]);

  return (
    <div className="location-container">
      <h1>{title}</h1>

      <div className="location-info">
        <p className="location-title">{venueName}</p>
        <p className="location-address">{address}</p>
      </div>

      <div className="location-tabs">
        <button
          className={`location-tab ${activeTab === "map" ? "active" : ""}`}
          onClick={() => setActiveTab("map")}
        >
          {mapTabLabel}
        </button>
        <button
          className={`location-tab ${activeTab === "sketch" ? "active" : ""}`}
          onClick={() => setActiveTab("sketch")}
        >
          {sketchTabLabel}
        </button>
      </div>

      <div className="location-content">
        {activeTab === "map" ? (
          window.kakao?.maps ? (
            <div ref={ref} className="map-container" />
          ) : (
            <p>{loadingText}</p>
          )
        ) : (
          <img
            src={sketchImageUrl}
            alt="약도"
            className="sketch-image"
            style={{ maxWidth: "400px", height: "auto" }}
          />
        )}
      </div>
    </div>
  );
}

export default Location;
