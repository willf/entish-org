\version "2.10.0"\header { title = "Johannesburg. L. M." piece = "Con molta vuvuzela" composer = "Will Fitzgerald, 2010"}#(set-default-paper-size "letter" 'landscape)stanzaOne = \lyricmode {

O come, loud an -- thems let us sing,
Loud thanks to our Al -- might -- y King.
For we our voic -- es high should raise,
When our sal -- va -- tion's Rock we praise.}
sopranoMusic = { \sacredHarpHeads  \set shapeNoteStyles = ##(fa #f la fa #f la mi)   \clef treble
   \key bes \major
   \autoBeamOff
   \time 2/2
	\relative c'' {

	r2 bes2 | bes2 bes2 | bes2 bes2 | bes2 bes2 | bes1 |

	r2 bes2 | bes2 bes8[( bes8] bes4) | bes2 bes2 | 

	bes2 bes2 | bes1 |

	r2 bes2 | bes2 bes2 | bes2 bes2|

	bes2 bes4( bes4) | bes1

	r2 bes2 | bes2 bes2 | bes2 bes2 | bes2 bes2 | bes1

}}altoMusic = { \sacredHarpHeads  \set shapeNoteStyles = ##(fa #f la fa #f la mi)   \clef treble
   \key bes \major
   \autoBeamOff
   \time 2/2
	\relative f' {


	r2 bes,2 | bes2 bes2 | bes2 bes2 | bes2 bes2 | bes1 |

	r2 bes2 | bes2 bes4( bes4) | bes2 bes4( bes4) | bes2 bes2 | bes1 |

	r2 bes2 | bes2 bes2 | bes2 bes2 | bes2 bes2 | bes1 |

	r2 bes2 | bes2 bes8[( bes8] bes4) | 

	bes2 bes2 | bes2 bes2 | bes1 |

}}

tenorMusic = { \sacredHarpHeads  \set shapeNoteStyles = ##(fa #f la fa #f la mi)   \clef treble   \key bes \major
   \autoBeamOff   \time 2/2
	\relative c'' {
	r2 bes2 | bes2 bes2 | bes2 bes2 | bes2 bes2 | bes1 |

	r2 bes2 | bes2 bes2 | bes2 bes2 | bes2 bes2 | bes1 |

	r2 bes2 | bes2 bes2 | bes2 bes2 | bes2 bes2 | bes1 |

	r2 bes2 | bes2 bes2 | bes2 bes2 | bes2 bes2 | bes1 \bar "||" }}bassMusic = { \sacredHarpHeads  \set shapeNoteStyles = ##(fa #f la fa #f la mi)   \clef bass   \key bes \major
   \autoBeamOff   \time 2/2
	\relative c {

		r2 bes2 | bes2 bes2 | bes2 bes2 | bes2 bes2 | bes1 |

	r2 bes2 | bes2 bes2 | bes2 bes2 | bes2 bes2 | bes1 |

	r2 bes2 | bes2 bes2 | bes2 bes2 | bes2 bes2 | bes1 |

	r2 bes2 | bes2 bes2 | bes2 bes2 | bes2 bes2 | bes1 

}}\score{   <<           \new Voice = "one" { \sopranoMusic }           \new Voice = "two" { \altoMusic }           \new Lyrics \lyricsto "one" \stanzaOne       <<       >>           \new Voice = "three" { \tenorMusic }           \new  Voice = "four" { \bassMusic }   >>   \layout {       indent = 0 \cm       firstpagenumber =  no       papersize = a4   }}