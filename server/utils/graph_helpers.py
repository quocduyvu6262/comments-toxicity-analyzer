from collections import defaultdict


def histogram(metrics_map):
    res = {}
    for metric, values in metrics_map.items():
        res[metric] = [0 for _ in range(10)]
        for val in values:
            if 0 <= val <= 0.1:
                res[metric][0] += 1
            elif 0.1 < val <= 0.2:
                res[metric][1] += 1
            elif 0.2 < val <= 0.3:
                res[metric][2] += 1
            elif 0.3 < val <= 0.4:
                res[metric][3] += 1
            elif 0.4 < val <= 0.5:
                res[metric][4] += 1
            elif 0.5 < val <= 0.6:
                res[metric][5] += 1
            elif 0.6 < val <= 0.7:
                res[metric][6] += 1
            elif 0.7 < val <= 0.8:
                res[metric][7] += 1
            elif 0.8 < val <= 0.9:
                res[metric][8] += 1
            else:
                res[metric][9] += 1
    return res


def average_score(metrics_map):
    res = defaultdict(int)
    for metric, values in metrics_map.items():
        avg = (sum(values) / len(values)) * 100
        res[metric] = int(round(avg))
    return res
