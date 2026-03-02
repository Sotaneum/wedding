import type { Setting } from "../types";
import rawSetting from "../../setting.json";
import Banner from "./Banner";
import toImageUrl from "../utils/toImageUrl";
import GALLERY_IMAGES from "../gallery";
import ASSETS_IMAGES from "../assets";
import Title from "./Title";
import Countdown from "./Countdown";
import Story from "./Story";
import Calendar from "./Calendar";
import Contact from "./Contact";
import Gallery from "./Gallery";
import Location from "./Location";
import TextNotice from "./TextNotice";
import BusNotice from "./BusNotice";
import Congratulations from "./Congratulations";
import Share from "./Share";

interface ItemProps {
  id?: string;
  show?: boolean;
  onLoaded?: () => void;
}

const setting = rawSetting as Setting;
const weddingDate = new Date(setting.wedding.date + "T" + setting.wedding.time);

export default function Item({
  id,
  show = false,
  onLoaded = () => {},
}: ItemProps) {
  if (!id && !show) return null;
  if (id === "banner") {
    return (
      <Banner
        images={setting.banner.images
          .map((image) => toImageUrl(GALLERY_IMAGES, image))
          .filter(Boolean)}
        onLoaded={() => onLoaded()}
      >
        <Item id="title" />
      </Banner>
    );
  }
  if (id === "title" && !!setting.title) {
    return (
      <Title
        weddingDate={weddingDate}
        hero={setting.hero}
        info={setting.title.info}
        location={setting.wedding.location}
        showParent={setting.title.showParent}
      />
    );
  }
  if (id === "countdown" && !!setting.countdown) {
    return <Countdown weddingDate={weddingDate} />;
  }
  if (id === "story" && !!setting.story) {
    return (
      <Story
        title={setting.story.title}
        description={setting.story.description}
        card={toImageUrl(ASSETS_IMAGES, setting.story.card)}
        hero={setting.hero}
      />
    );
  }
  if (id === "calendar" && !!setting.calendar) {
    return <Calendar weddingDate={weddingDate} />;
  }
  if (id === "contact" && !!setting.contact && setting.contact.length > 0) {
    return <Contact items={setting.contact} />;
  }
  if (id === "gallery" && GALLERY_IMAGES.length > 0) {
    return (
      <Gallery
        images={GALLERY_IMAGES}
        filteredImages={
          setting.gallery
            ? setting.gallery.emptyImages.map((img) =>
                toImageUrl(ASSETS_IMAGES, img),
              )
            : []
        }
      />
    );
  }
  if (id === "map" && setting.map) {
    return (
      <Location
        venueName={setting.map.title}
        address={setting.wedding.address}
        addressJibun={setting.wedding.address2}
        websiteUrl={setting.map.websiteUrl}
        mapCenter={setting.map.center}
        markerPosition={setting.map.marker}
        sketchImageUrl={toImageUrl(ASSETS_IMAGES, setting.map.locationSketch)}
        venueLogo={toImageUrl(ASSETS_IMAGES, setting.map.weddingLogo)}
      />
    );
  }
  if (id === "notice" && setting.notice && setting.notice.length > 0) {
    return setting.notice.map((notice) => (
      <TextNotice key={notice.title} {...notice} />
    ));
  }
  if (
    id === "bus_notice" &&
    setting.bus_notice &&
    setting.bus_notice.length > 0
  ) {
    return setting.bus_notice.map((notice) => (
      <BusNotice key={notice.title} {...notice} />
    ));
  }
  if (id === "congratulations" && setting.congratulations) {
    return <Congratulations items={setting.congratulations} />;
  }
  if (id === "share" && setting.share?.kakaotalk) {
    return <Share templateId={setting.share.kakaotalk.template_id} />;
  }
  return null;
}
