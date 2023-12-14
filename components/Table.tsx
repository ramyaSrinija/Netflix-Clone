import React from 'react'
import { plansState } from '@/atoms/modalAtom';

interface Props {
  selectedPlan: string;
}

const Table = ({ selectedPlan }: Props) => {
  return (
    <table>
      <tbody className='divide-y divide-[gray]'>
        <tr>
          <td className='tableDataTitle'>Monthly Price</td>
          {
            plansState?.map(plan => (
              <td key={plan?.key} className={`tableDataFeature ${selectedPlan === plan?.key ? 'opacity-100' : 'opacity-60'}`}>RS {plan?.price}</td>
            ))
          }
        </tr>

        <tr>
          <td className='tableDataTitle'>Video Quality</td>
          {
            plansState?.map(plan => (
              <td key={plan?.key} className={`tableDataFeature ${selectedPlan === plan?.key ? 'opacity-100' : 'opacity-60'}`}>{plan?.videoQuality}</td>
            ))
          }
        </tr>

        <tr>
          <td className='tableDataTitle'>Resolution</td>
          {
            plansState?.map(plan => (
              <td key={plan?.key} className={`tableDataFeature ${selectedPlan === plan?.key ? 'opacity-100' : 'opacity-60'}`}>{plan?.resolution}</td>
            ))
          }
        </tr>

        <tr>
          <td className='tableDataTitle'>Multiple Devices</td>
          {
            plansState?.map(plan => (
              <td key={plan?.key} className={`tableDataFeature ${selectedPlan === plan?.key ? 'opacity-100' : 'opacity-60'}`}>{plan?.devices}</td>
            ))
          }
        </tr>
      </tbody>
    </table>
  )
}

export default Table