import "./ServiceCalendar.css";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useData } from "../../shared/dataContext";

const ServiceCalendar = () => {
  const { setValues, data } = useData();

  const [inspectionBeforeTest, setInspectionBeforeTest] = useState("");
  const [multiPointInspection, setMultiPointInspection] = useState("");
  const [summerInspection, setSummerInspection] = useState("");
  const [winterInspection, setWinterInspection] = useState("");

  let carTest = moment(data.mivchan_acharon_dt).format("DD/MM/YYYY");
  let carYear = data.shnat_yitzur;
  let lastInspection = data.lastInspection;

  useEffect(() => {
    getInspectionBeforeTest();
    getMultiPointInspection();
    getSeasonInspection();
  }, []);

  const getFullDate = (date) => {
    let momentObjDate = moment(date, "DD/MM/YYYY");
    let fullDate = momentObjDate.toDate();
    return fullDate;
  };

  const getInspectionBeforeTest = () => {
    let yearNow = new Date().getFullYear();
    let year = carYear;
    let carAge = yearNow - year;

    let test = carTest;
    let fullDateLastTest = getFullDate(test);

    let momentObjNextTest = {};
    if (carAge <= 2) {
      momentObjNextTest = moment(fullDateLastTest).add(3, "years");
    }
    if (carAge >= 3 && carAge < 20) {
      momentObjNextTest = moment(fullDateLastTest).add(1, "years");
    }
    if (carAge >= 20) {
      momentObjNextTest = moment(fullDateLastTest).add(6, "months");
    }
    let momentObjDate = moment(momentObjNextTest).subtract(14, "days");
    let date = moment(momentObjDate).format("DD/MM/YYYY");
    setInspectionBeforeTest(date);
  };

  const getMultiPointInspection = () => {
    let inspection = lastInspection;
    if (inspection === "" || inspection === undefined) {
      let dateNow = new Date();
      let momentObjDate = moment(dateNow).add(7, "days");
      let date = moment(momentObjDate).format("DD/MM/YYYY");
      setMultiPointInspection(date);
      return;
    }
    let fullDate = getFullDate(inspection);
    let momentObjDate = moment(fullDate).add(1, "year");
    let date = moment(momentObjDate).format("DD/MM/YYYY");
    setMultiPointInspection(date);
  };

  const getSeasonInspection = () => {
    let fullDateNow = new Date();
    let dateNow = moment(fullDateNow);
    let momentObjDateAfterYear = moment(fullDateNow).add(1, "year");
    let dateAfterYear = moment(momentObjDateAfterYear);
    let firstOfMay;
    let firstOfNovember;
    while (dateAfterYear > dateNow) {
      if (dateNow.format("DD/MM") === "01/05") {
        firstOfMay = dateNow.format("DD/MM/YYYY");
      }
      if (dateNow.format("DD/MM") === "01/11") {
        firstOfNovember = dateNow.format("DD/MM/YYYY");
      }
      dateNow.add(1, "day");
    }
    setSummerInspection(firstOfMay);
    setWinterInspection(firstOfNovember);
  };

  const scheduleServices = (date) => {
    let fullRecommendedDate = getFullDate(date);
    let momentObjDateToShedule = moment(fullRecommendedDate).subtract(
      7,
      "days"
    );
    let dateToShedule = moment(momentObjDateToShedule).format("DD/MM/YYYY");
    return dateToShedule;
  };

  const getSortedData = () => {
    const services = [
      {
        recommended: inspectionBeforeTest,
        service: "Inspection Before Annual Vehicle Licensing Test",
        shedule: scheduleServices(inspectionBeforeTest),
      },
      {
        recommended: multiPointInspection,
        service: "Multi-Point Inspection",
        shedule: scheduleServices(multiPointInspection),
      },
      {
        recommended: winterInspection,
        service: "Inspection before winter",
        shedule: scheduleServices(winterInspection),
      },
      {
        recommended: summerInspection,
        service: "Inspection before summer",
        shedule: scheduleServices(summerInspection),
      },
    ];
    const sortedData = services.sort((a, b) => {
      let dateA = new Date(a.recommended.split("/").reverse().join("-"));
      let dateB = new Date(b.recommended.split("/").reverse().join("-"));
      return dateA - dateB;
    });
    return sortedData;
  };

  const sortedData = getSortedData();
  const servicesTable = sortedData.map((service, index) => {
    return (
      <tbody key={index}>
        <tr>
          <th className="service-cell">
            <small>recommended</small>
            <br />
            {service.recommended}
          </th>
          <td className="service-cell">{service.service}</td>
          <td className="service-cell">
            <small>schedule</small>
            <br />
            <a className="schedule-link" href="#/schedule">
              {service.shedule}
            </a>
          </td>
        </tr>
      </tbody>
    );
  });

  return (
    <div className="c-service-calendar col-md-12 col-lg-4">
      <h1 className="display-4 my-skoda-title">Service Calendar</h1>
      <p className="text-regular">
        Keep Your Skoda At Its Best with Our Service
      </p>
      <span className="text-small">
        Scheduled maintenance can saving you lots in the long run
      </span>
      <table className="table table-success table-striped table-bordered">
        <thead>
          <tr className="table-secondary">
            <th className="service-cell" scope="row">
              Visit
            </th>
            <th className="service-cell">Service</th>
            <th className="service-cell">Schedule</th>
          </tr>
        </thead>
        {servicesTable}
      </table>
    </div>
  );
};

export default ServiceCalendar;
