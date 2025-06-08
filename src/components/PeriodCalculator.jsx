import { useState } from 'react';
import axios from 'axios';
import './PeriodCalculator.css';

function PeriodCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculatePeriod = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/calculate-period', {
        lastPeriodDate,
        cycleLength: parseInt(cycleLength),
        periodLength: parseInt(periodLength)
      });

      setResults(response.data);
    } catch (err) {
      setError('Failed to calculate period dates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="period-calculator container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Period Calculator</h2>
              
              <form onSubmit={calculatePeriod}>
                <div className="mb-3">
                  <label htmlFor="lastPeriodDate" className="form-label">
                    When did your last period start?
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="lastPeriodDate"
                    value={lastPeriodDate}
                    onChange={(e) => setLastPeriodDate(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cycleLength" className="form-label">
                    How long is your menstrual cycle?
                  </label>
                  <select
                    className="form-select"
                    id="cycleLength"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(e.target.value)}
                  >
                    {Array.from({ length: 15 }, (_, i) => i + 21).map(num => (
                      <option key={num} value={num}>{num} days</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="periodLength" className="form-label">
                    How long does your period usually last?
                  </label>
                  <select
                    className="form-select"
                    id="periodLength"
                    value={periodLength}
                    onChange={(e) => setPeriodLength(e.target.value)}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} days</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Calculating...' : 'Calculate'}
                </button>
              </form>

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}

              {results && (
                <div className="mt-4">
                  <h3 className="h5 mb-3">Your Next 3 Periods:</h3>
                  <div className="list-group">
                    {results.nextPeriods.map((date, index) => (
                      <div key={date} className="list-group-item">
                        <strong>Period {index + 1}:</strong>{' '}
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeriodCalculator; 