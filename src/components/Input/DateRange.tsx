import React from 'react';
import {DatePicker} from "antd";
import {DatePickerProps, RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";

const DateRange: React.FC<any> = ({ setDateStart, setDateEnd}:any) => {

    const {RangePicker} = DatePicker;

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        return current.subtract(-1, 'day') < dayjs().endOf('day')
    }

    const onChangeDate = (
        date: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string]) => {
        setDateStart(dateString[0])
        setDateEnd(dateString[1])
    }

    return (
        <div className="create__date-wrap">
            <RangePicker disabledDate={disabledDate} onChange={onChangeDate}/>
        </div>
    );
};

export default DateRange;