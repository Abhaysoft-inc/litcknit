import React from 'react'

interface Result {
    position: number
    participantName: string
    points: number
}

interface ResultsFormProps {
    results: Result[]
    onResultsChange: (results: Result[]) => void
    onSubmit: () => void
}

export default function ResultsForm({ results, onResultsChange, onSubmit }: ResultsFormProps) {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Declare Results</h3>
                <p className="text-sm text-gray-600">Enter the winners and their points to publish the results</p>
            </div>

            <div className="space-y-4">
                {results.map((result, index) => (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                                    <span className="text-3xl">
                                        {result.position === 1 ? '🥇' : result.position === 2 ? '🥈' : '🥉'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                        {result.position === 1 ? '1st Place' : result.position === 2 ? '2nd Place' : '3rd Place'} Winner
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter participant name"
                                        value={result.participantName}
                                        onChange={(e) => {
                                            const newResults = [...results]
                                            newResults[index].participantName = e.target.value
                                            onResultsChange(newResults)
                                        }}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                        Points Scored
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter points"
                                        value={result.points || ''}
                                        onChange={(e) => {
                                            const newResults = [...results]
                                            newResults[index].points = parseInt(e.target.value) || 0
                                            onResultsChange(newResults)
                                        }}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4">
                <button
                    onClick={onSubmit}
                    className="w-full px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold text-lg transition-all hover:shadow-lg"
                >
                    Publish Results
                </button>
            </div>
        </div>
    )
}
