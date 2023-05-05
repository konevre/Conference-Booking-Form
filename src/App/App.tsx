import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ConferenceSchema = Yup.object().shape({
    tower: Yup.string().required("Please select a tower"),
    floor: Yup.number().required("Please select a floor"),
    room: Yup.number().required("Please select a room"),
    date: Yup.date().required("Please enter a date"),
    startTime: Yup.string()
        .required("Please select a starting time")
        .test("startTime", "Start time must be before end time", function (value, { parent }) {
            const start = value && value.split(":").join("");
            const end = parent.endTime && parent.endTime.split(":").join("");
            return !start || !end || parseInt(start) < parseInt(end);
        }),
    endTime: Yup.string()
        .required("Please select an ending time")
        .test("endTime", "End time must be after start time", function (value, { parent }) {
            const start = parent.startTime && parent.startTime.split(":").join("");
            const end = value && value.split(":").join("");
            return !start || !end || parseInt(start) < parseInt(end);
        }),
});

const App = () => {
    return (
        <>
            <Formik
                initialValues={{
                    tower: "",
                    floor: "",
                    room: "",
                    date: "",
                    startTime: "",
                    endTime: "",
                    comments: "",
                }}
                validationSchema={ConferenceSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log(JSON.stringify(values));
                    resetForm();
                }}
            >
                {(formik) => (
                    <div className="flex min-h-full items-center p-3 ">
                        <div className="m-auto flex max-w-[800px] grow flex-col gap-y-5 rounded-lg bg-white p-7 drop-shadow-2xl sm:p-7">
                            <header className="text-xl font-bold">Conference Booking</header>
                            <Form id="form" className="flex flex-col gap-y-2">
                                <div className="flex gap-x-3 ">
                                    <div className="flex w-full flex-col gap-y-1">
                                        <label htmlFor="tower">Tower</label>
                                        <Field
                                            as="select"
                                            name="tower"
                                            id="tower"
                                            className={`${
                                                formik.errors.tower ? "outline outline-red-600" : ""
                                            } rounded`}
                                        >
                                            <option value="">Select tower</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                        </Field>
                                        <ErrorMessage
                                            name="tower"
                                            component="div"
                                            className="font-semibold text-red-600"
                                        />
                                    </div>
                                    <div className="flex w-full flex-col gap-y-1">
                                        <label htmlFor="floor">Floor</label>
                                        <Field
                                            as="select"
                                            name="floor"
                                            id="floor"
                                            className="rounded"
                                        >
                                            <option value="">Select floor</option>;
                                            {new Array(25).fill(0).map((_, i) => {
                                                const num = i + 3;
                                                return <option value={num}>{num}</option>;
                                            })}
                                        </Field>
                                        <ErrorMessage
                                            name="floor"
                                            component="div"
                                            className="font-semibold text-red-600"
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full flex-col gap-y-1">
                                    <label htmlFor="room">Room</label>
                                    <Field as="select" name="room" id="room" className="rounded">
                                        <option value="">Select room</option>;
                                        {new Array(10).fill(0).map((_, i) => {
                                            const num = i + 1;
                                            return <option value={num}>{num}</option>;
                                        })}
                                    </Field>
                                    <ErrorMessage
                                        name="room"
                                        component="div"
                                        className="font-semibold text-red-600"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="date">Date</label>
                                    <Field name="date" type="date" className="rounded" />
                                    <ErrorMessage
                                        name="date"
                                        component="div"
                                        className="font-semibold text-red-600"
                                    />
                                </div>
                                <div className="flex gap-x-3">
                                    <div className="flex w-full flex-col gap-y-1">
                                        <label htmlFor="start">Start</label>
                                        <Field name="startTime" type="time" className="rounded" />
                                        <ErrorMessage
                                            name="startTime"
                                            component="div"
                                            className="font-semibold text-red-600"
                                        />
                                    </div>
                                    <div className="flex w-full flex-col gap-y-1">
                                        <label htmlFor="end">End</label>
                                        <Field name="endTime" type="time" className="rounded" />
                                        <ErrorMessage
                                            name="endTime"
                                            component="div"
                                            className="font-semibold text-red-600"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <label htmlFor="comments">Comments</label>
                                    <Field
                                        as="textarea"
                                        name="comments"
                                        id="comments"
                                        cols={10}
                                        rows={10}
                                        className="rounded"
                                    ></Field>
                                </div>
                                <div className="flex gap-x-3">
                                    <button
                                        type="button"
                                        onClick={() => formik.resetForm()}
                                        className="w-full rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        form="form"
                                        type="submit"
                                        className="w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
};

export default App;
