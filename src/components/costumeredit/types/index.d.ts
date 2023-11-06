import React from 'react'
import { Idata } from '../../types'

export interface IEditCostumercontactprops {
    data: Idata, onchange: (value: React.ChangeEvent<HTMLInputElement>) => void
}