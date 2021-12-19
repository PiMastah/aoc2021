def rotation_matrices(angles, directions):
    eijk = np.zeros((3, 3, 3))
    eijk[0, 1, 2] = eijk[1, 2, 0] = eijk[2, 0, 1] = 1
    eijk[0, 2, 1] = eijk[2, 1, 0] = eijk[1, 0, 2] = -1
    theta = angles[:, None, None]
    K = directions.dot(eijk)
    return np.eye(3) + K * np.sin(theta) + K @ K * (1 - np.cos(theta))

print(rotation_matrices())