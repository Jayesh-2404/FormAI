import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Themes from '@/app/_data/Themes'
import GradientBg from '@/app/_data/GradientBg'
import { Button } from '@/components/ui/button'
import Style from '@/app/_data/Style'
import { Checkbox } from '@/components/ui/checkbox'

  
function Controller({selectedTheme,selectedBackground,selectedStyle,setSignInEnable}) {
    const [showMore,setShowMore]=useState(6)
  return (
    <div>
        {/* Theme selection Controller */}
        <div className="mb-6">
          <h2 className='text-base font-semibold mb-2 text-gray-800 dark:text-gray-100'>Theme</h2>
          <Select onValueChange={(value)=>selectedTheme(value)}>
              <SelectTrigger className="w-full">
                  <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                  {Themes.map((theme,index)=>(
                          <SelectItem value={theme.theme} key={index}>
                              <div className='flex gap-3'>
                              <div className='flex'>
                                  <div className='h-5 w-5 rounded-l-md' 
                                  style={{backgroundColor:theme.primary}}
                                  ></div>
                                  <div className='h-5 w-5' 
                                  style={{backgroundColor:theme.secondary}}
                                  ></div>
                                  <div className='h-5 w-5' 
                                  style={{backgroundColor:theme.accent}}
                                  ></div>
                                  <div className='h-5 w-5 rounded-r-md' 
                                  style={{backgroundColor:theme.neutral}}
                                  ></div>
                                
                              </div>
                              {theme.theme}
                              </div>
                          </SelectItem>
                  
                  ))}
                
              </SelectContent>
          </Select>
        </div>

        {/* Background Selection Controller */}
        <div className="mb-6">
          <h2 className='text-base font-semibold mb-3 text-gray-800 dark:text-gray-100'>Background</h2>
          <div className='grid grid-cols-3 gap-3'>
              {GradientBg.map((bg,index)=>(index<showMore)&&(
                  <div 
                  key={index}
                  onClick={()=>selectedBackground(bg.gradient)}
                  className='w-full h-[60px] rounded-lg cursor-pointer
                  hover:border-primary hover:border-2 flex items-center justify-center
                  border transition-all'
                  style={{background:bg.gradient}}
                  >
                      {index==0&&'None'}
                  </div>
              ))}
          </div>
          <Button variant="ghost" size="sm" 
              className="w-full mt-2 text-primary"
              onClick={()=>setShowMore(showMore>6?6:20)}
              >{showMore>6?'Show Less':'Show More'}
          </Button>
        </div>

        {/* Style Selection Controller */}
        <div className='mb-6'>
          <h2 className='text-base font-semibold mb-3 text-gray-800 dark:text-gray-100'>Style</h2>
          <div className='grid grid-cols-3 gap-3'>
            {Style.map((item,index)=>(
                <div key={index} className='cursor-pointer group' onClick={()=>selectedStyle(item)}>
                  <div className='border-2 border-transparent group-hover:border-primary rounded-lg transition-all'>
                    <img src={item.img} width={600} height={80} className='rounded-lg w-full h-auto' alt={item.name}/>
                  </div>
                  <h2 className='text-sm text-center mt-1 text-gray-600 dark:text-gray-300'>{item.name}</h2>
                </div>
            ))}
          </div>
        </div>

        {/* Auth Checkbox */}
        <div className='border-t pt-4 mt-2'>
          <div className='flex items-start gap-3'>
            <Checkbox id="auth-checkbox" onCheckedChange={(e)=>setSignInEnable(e)} />
            <div className='grid gap-1.5 leading-none'>
                <label htmlFor="auth-checkbox" className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Enable Sign-In
                </label>
                <p className='text-xs text-muted-foreground'>
                  Require users to sign in before submitting the form.
                </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Controller