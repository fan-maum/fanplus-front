"use client";

import React from "react";
import { useTranslations } from "next-intl";

const Homepage = () => {
  const area1 = useTranslations("MainPage.Area1");
  const area2 = useTranslations("MainPage.Area2");
  const area3 = useTranslations("MainPage.Area3");
  const area4 = useTranslations("MainPage.Area4");
  const area5 = useTranslations("MainPage.Area5");
  const area6 = useTranslations("MainPage.Area6");
  return (
    <>
      <div className="area1">
        <h1>{area1("line1")}</h1>
        <h1>{area1("line2")}</h1>
        {area1("line3") && <h1>{area1("line3")}</h1>}
      </div>
      <div className="area2">
        <h1>{area2("title1")}</h1>
        {area2("title2") && <h1>{area2("title2")}</h1>}
        <p>
          {area2("line1")}
          <b>{area2("bold-line1")}</b>
        </p>
        <p>
          <b>{area2("bold-line2-front")}</b>
          {area2("line2")}
          <b>{area2("bold-line2-back")}</b>
        </p>
        <p>{area2("line3")}</p>
        <p>{area2("line4")}</p>
        <p>{area2("line5")}</p>
        <br />
        <p>{area2("line6")}</p>
        <p>{area2("line7")}</p>
      </div>
      <div className="area3">
        <h1>{area3("title")}</h1>
        <p>{area3("line1")}</p>
        <p>{area3("line2")}</p>
        <br />
        <p>{area3("line3")}</p>
        <p>{area3("line4")}</p>
        <h3>{area3("Ad-title")}</h3>
        <div className="Ad-Box" style={{ display: "flex" }}>
          <p>{area3("Ad1")}</p>
          <p>{area3("Ad2")}</p>
          <p>{area3("Ad3")}</p>
        </div>
      </div>
      <div className="area4">
        <h1>{area4("title1")}</h1>
        {area4("title2") && <h1>{area4("title2")}</h1>}
        <p>{area4("line1")}</p>
        <p>{area4("line2")}</p>
        <p>{area4("line3")}</p>
        <p>{area4("plus")}</p>
      </div>
      <div className="area5">
        <h1>{area5("title1")}</h1>
        {area5("title2") && <h1>{area5("title2")}</h1>}
        <p>{area5("line1")}</p>
        <p>{area5("line2")}</p>
        <p>{area5("line3")}</p>
        <p>{area5("line4")}</p>
        <p>{area5("plus1")}</p>
        {area5("plus2") && <h1>{area5("plus2")}</h1>}
      </div>
      <div className="area6">
        <h1>{area6("title1")}</h1>
        {area6("title2") && <h1>{area6("title2")}</h1>}
        <p>{area6("line1")}</p>
        <p>{area6("line2")}</p>
        <p>{area6("line3")}</p>
        <p>{area6("line4")}</p>
      </div>
    </>
  );
};

export default Homepage;
