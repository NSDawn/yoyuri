export const gameConfigList = { 
    memoLength: 6,
    recordCharDelay: 28,
    _recordMinCharDelay: 4,
    _recordFastCharDelay: 15,
    _recordMediumCharDelay: 28,
    _recordSlowCharDelay: 40,
    colorTheme: "theme-light",
}

export type gameConfigListT = { 
    memoLength: number,
    recordCharDelay: number,
    _recordMinCharDelay: number,
    _recordFastCharDelay: number,
    _recordMediumCharDelay: number,
    _recordSlowCharDelay: number,
    colorTheme: string,
}