import { CheckIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function Step({
    steps,
    handleGoToStep,
}: {
    steps: { name: string; status: string }[]
    handleGoToStep: (step: number) => void
}) {

    const handleGoTo = (stepIdx: number) => {
        // if step is complete or current, go to that step
        if (steps[stepIdx].status === 'complete' || steps[stepIdx].status === 'current') {
            handleGoToStep(stepIdx + 1);
        } else {
            return;
        }
    }

    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
                {steps.map((step, stepIdx) => (
                    <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
                        {step.status === 'complete' ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-indigo-600" />
                                </div>
                                <div
                                    onClick={() => handleGoTo(stepIdx)}
                                    className="relative flex h-8 w-8 items-center justify-center rounded-full cursor-pointer bg-indigo-600 hover:bg-indigo-900"
                                >
                                    <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                    <span className="sr-only">{step.name}</span>
                                </div>
                            </>
                        ) : step.status === 'current' ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <div
                                    onClick={() => handleGoTo(stepIdx)}
                                    className="relative flex h-8 w-8 items-center justify-center rounded-full cursor-pointer border-2 border-indigo-600 bg-white"
                                    aria-current="step"
                                >
                                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
                                    <span className="sr-only">{step.name}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <div
                                    onClick={() => handleGoTo(stepIdx)}
                                    className="group relative flex h-8 w-8 items-center justify-center rounded-full cursor-pointer border-2 border-gray-300 bg-white hover:border-gray-400"
                                >
                                    <span
                                        className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">{step.name}</span>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
