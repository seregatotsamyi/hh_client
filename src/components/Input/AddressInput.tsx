import React from 'react';
import {AutoComplete} from "antd";
import {Controller} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { RootState } from '../../store/store';
import {fetchOptionsAddress, setCurrentAddress} from "../../store/inputReducer";
import useDebounced from "../../hoc/useDebounced";

const AddressInput: any = (control:any) => {

    const dispatch = useAppDispatch()

    const optionsAddress = useAppSelector((state: RootState) => state.input.optionsAddress)
    const currentAddress = useAppSelector((state: RootState) => state.input.currentAddress)

    const setCurrentAddressCom = (stroke: string) => {
        optionsAddress.forEach((item: any) => {
            if (item.value === stroke) {
                dispatch(setCurrentAddress(item))
            }
        })
    }

    const setOptionAddress = (stroke: string) => {
        dispatch(fetchOptionsAddress(stroke))
        dispatch(setCurrentAddress({
            house: null,
            region: null,
            region_with_type: null,
            street_with_type: null,
            city: null,
            index: null,
            region_type: null,
            country: null
        }))
    }

    const debouncedValue = useDebounced(setOptionAddress, 500);

    const optionsAddressSet = optionsAddress.map((e: any): any => ({
        value: e.value || null,
        label: e.value || null,
    }))

    return (
        <Controller
            control={control.control}
            name='address'
            rules={{
                validate: value => (currentAddress.house !== null && currentAddress.house !== undefined) || 'Необходимо указать номер дома'
            }}
            render={({field}) => (
                <>
                    <AutoComplete  {...field}
                                   showSearch
                                   className={"ant-custom"}
                                   options={optionsAddressSet}
                                   autoClearSearchValue={false}
                                   onSearch={(value: string) => {
                                       debouncedValue(value)
                                   }}
                                   onSelect={(value: any) => {
                                       setCurrentAddressCom(value)
                                   }}
                    />

                </>
            )}
        />
    );
};

export default AddressInput;